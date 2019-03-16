const Clarifai =  require('clarifai');

const app = new Clarifai.App({
    apiKey: '4fda993f7b6b4221a6255789a6c62194'
   });

const handleApiCall = (req,res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with api'))
}
  
const handleImage = (req, res, db) =>{
    const { id } = req.body;
    // let found = false;
    db('users').where('id', '=', id)
        .increment('entries',1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('error to get entries'));
}

module.exports = {
    handleImage:handleImage,
    handleApiCall:handleApiCall
};