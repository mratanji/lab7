var models = require('../models');

exports.projectInfo = function(req, res) {
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback
  models.Project
    .find({"_id": projectID}) // Returns an array of objects w/ matching ID's
    .exec(afterQuery);  // Calls the method on this array of (hopefully 1) object
  
  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]); // One object should be in the zero position
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);
  
  var newProject = new models.Project({
    "title": form_data.project_title,
    "date": form_data.date,
    "summary": form_data.summary,
    "image": form_data.image_url
  });

  newProject.save(afterAdd);
 
  function afterAdd(err){
    if(err){
      cosole.log(err);
      res.send(500);
    }

    res.send();
  }

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  models.Project
    .find({"_id": projectID})
    .remove()
    .exec(afterRemove);

  function afterRemove(err){
    if(err){
      console.log(err);
      res.send(500);
    }
    res.send();
    //res.redirect('/');
  }

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
}