import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import booksData from "./data/books.json";
import { resolveShowConfigPath } from "@babel/core/lib/config/files";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const User = mongoose.model("User", {
  name: String,
  age: Number,
  deceased: Boolean
});


const Book = mongoose.model("Book", {
  bookID: Number,
  title: String,
  authors: String,
  average_rating: Number,
  isbn: Number,
  isbn13: Number,
  language_code: String,
  num_pages: Number,
  ratings_count: Number,
  text_reviews_count: Number
})

if(process.env.RESET_DB) {
  const resetDataBase = async () => {
    await Book.deleteMany();
    booksData.forEach(singleBook => {
      const newBook = new Book(singleBook);
      newBook.save();
    })
  }
  resetDataBase();
}

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is a book API!");
});

  app.get("/books/", async (req, res) => {
    const Books = await Book.find({})
    res.status(200).json({
      success: true,
      body: Books
    })
  })

app.get("/books/id/:id", async (req, res) => {
  try {
    const singleBook = await Book.findById(req.params.id);
    if (singleBook) {
      res.status(200).json({
        success: true,
        body: singleBook 
       });
    } else {
      res.status(404).json({
        success: false,
        body: {
          message: "Could not find the book"
        } 
       });
    }
  } catch(error) {
    res.status(400).json({
      success: false,
      body: {
        message: "Invalid id"
      } 
     });
  }
  });

  app.get("/books/title/:title", async (req, res) => {
    const book = await Book.findOne({title: req.params.title})
    if (book) {
      res.status(200).json({
        success: true,
        body: book 
       });
      } else {
        res.status(404).json({ error: 'There is no book with that title.' })
      }
    })

    app.get("/books/authors/:authors", async (req, res) => {
      const book = await Book.findOne({authors: req.params.authors})
      if (book) {
        res.status(200).json({
          success: true,
          body: book 
         });
        } else {
          res.status(404).json({ error: 'There is no author with that name.' })
        }
      })

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



// ---------------> SONGS API <---------------

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// const Song = mongoose.model("Song", {
//   id: Number,
//   trackName: String,
//   artistName: String,
//   genre: String,
//   bpm: Number,
//   energy: Number,
//   danceability: Number,
//   loudness: Number,
//   liveness: Number,
//   valence: Number,
//   length: Number,
//   acousticness: Number,
//   speechiness: Number,
//   popularity: Number
// });

// if(process.env.RESET_DB) {
//   const resetDataBase = async () => {
//     await Song.deleteMany();
//     topMusicData.forEach(singleSong => {
//       const newSong = new Song(singleSong);
//       newSong.save();
//     })
//     // await User.deleteMany();
//     // const testUser = new User({name: "Daniel", age: 28, deceased: false});
//     // testUser.save();
//   }
//   resetDataBase();
// }

// const port = process.env.PORT || 8080;
// const app = express();

// // Add middlewares to enable cors and json body parsing
// app.use(cors());
// app.use(express.json());

// // Start defining your routes here
// app.get("/", (req, res) => {
//   res.send("Hello Technigo!");
// });

// app.get("/songs", async (req, res) => {
//   const allTheSongs = await Song.find({})
//   res.status(200).json({
//    success: true,
//    body: allTheSongs 
//   });
// });

// app.get("/songs/id/:id", async (req, res) => {
// try {
//   const singleSong = await Song.findById(req.params.id);
//   if (singleSong) {
//     res.status(200).json({
//       success: true,
//       body: singleSong 
//      });
//   } else {
//     res.status(404).json({
//       success: false,
//       body: {
//         message: "Could not find the song"
//       } 
//      });
//   }
// } catch(error) {
//   res.status(400).json({
//     success: false,
//     body: {
//       message: "Invalid id"
//     } 
//    });
// }

// });
// // app.get("/songs/genre/:genre/danceability/:danceability", async (req, res) => {
//   app.get("/songs/", async (req, res) => {

//   const {genre, danceability} = req.query;
//   const response = {
//     success: true,
//     body: {}
//   }
//   const genreQuery = genre ? genre : /.*/;
//   const danceabilityQuery = danceability ? danceability : {$gt: 0, $lt: 100};
//   try {
//     // if (req.params.genre && req.params.danceability) {
//       response.body = await Song.find({genre: genreQuery, danceability: danceabilityQuery}).limit(2).sort({energy: 1}).select({trackName: 1, artistName: 1})
//       //.exec() to explore
//     // } else if (req.params.genre && !req.params.danceability) {
//     //   response.body = await Song.find({genre: req.params.genre})
//     // } else if (!req.params.genre && req.params.danceability) {
//     //   response.body = await Song.find({danceability: req.params.danceability})
//     // }
//     res.status(200).json({
//       success: true,
//       body: response
//     });

//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       body: {
//         message: error
//       } 
//      });
//   }

// });

