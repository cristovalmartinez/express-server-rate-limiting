import app from "./server"

const port = process.env.PORT || 6699

/**
 * Listener function to handle server startup.
 */
const listener = () => {
  try {
    console.log(`Server is now listening on PORT: ${port}`)
  } catch (err) {
    console.log(
      "There seems to be an error connecting to the server. Please try again."
    )
  }
}

app.listen(port, listener)
