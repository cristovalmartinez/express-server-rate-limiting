export function welcomeApi(req, res) {
  try {
    res.status(200).json({ message: 'hello user' })
  } catch (err) {
    console.error(err)

  }
}

