// controllers/userController.js


exports.receiveLabRequest = (req, res) => {
    // Retrieve user data from a database or other source
    console.log('receiveLabRequest, req.body: ', req.body);
    // Send the user data back to the client
    res.json(req.body);
    
  
  
  };
  