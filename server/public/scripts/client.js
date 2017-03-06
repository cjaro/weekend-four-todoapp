$(document).ready(function(){
  console.log('jquery was correctly sourced');
  getChoreData();
  function   getChoreData() {
    $.ajax({
      type: 'GET', //hooray, chores.... 7-year-old me is furious at this assignment.
      url: '/chores',
      success: function(response) {
        console.log('response', response); // array of chore objects
        $('#choreChart').empty(); //clears chore in chore chart
        for (var i = 0; i < response.length; i++) {
          var choreThing = response[i]; //loops through chores - this is an object
          var $newchore = $('<tr>'); //creating new row for each added chore
          $newchore.data('id', choreThing.id);
          $newchore.append('<td><input value="'+ choreThing.name + '" class="choreName"></td>');
          $newchore.append('<td><button class="deleteButton">Delete</button></td>');
          $newchore.append('<td><button class="doneButton">Done</button></td>');
          $('#choreChart').prepend($newchore);
        }
      }
    });
  }

  $('#newChoreForm').on('submit', function(event){
    event.preventDefault();
    var newChoreObject = {};
    var formFields = $(this).serializeArray();
    formFields.forEach(function(field) {
      newChoreObject[field.name] = field.value;
    });
//oh yippykiyay, throw those chores on a list
    $.ajax({
      type: 'POST',
      url: '/chores/new',
      data: newChoreObject,
      success: function(response){
        console.log(response);
        getChoreData();
        $('#newChoreForm > input').val('');
      }
    });
  });

//but what if I don't want to do that chore?
// No fear!! DELETE THAT SHIT OFF MY TO DO LIST.
// NO FUCKING MOPPING TODAY.

  $('#choreChart').on('click', '.deleteButton', function(){
    var idChoreDelete = $(this).parent().parent().data().id;
    console.log('idChoreDelete: ', idChoreDelete);
    $.ajax({
      type: 'DELETE',
      url: 'chores/delete/' + idChoreDelete,
      success: function(response){
        console.log(response);
        getChoreData();
      }
    })
  });

  $('#choreChart').on('click', '.doneButton', function(){
    var idChoreSave = $(this).parent().parent().data().id;
    var nameChoreSave = $(this).parent().parent().find('.choreName').val('done!'); //changes input text to done
    var choreObjectSave = {
      id: idChoreSave,
      chore: nameChoreSave,
    };

    //seriously how good is chipotle?

    $.ajax({
      type: 'PUT',
      url: 'chores/done/' + idChoreSave,
      data: choreObjectSave,
      success: function(response){
        console.log(response);
        getChoreData();
      }
    })
  });
  //


});//end doc ready

// add checked off visual when clicked?
// var list = document.querySelector('tr');
// list.addEventListener('click', function(ev) {
//   if (ev.target.tagName === 'LI') {
//     ev.target.classList.toggle('checked');
//   }
// }, false);

// function newElement() {
//   var li = document.createElement("li");
//   var inputValue = document.getElementById("myInput").value;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     alert("you have to add a chore");
//   } else {
//     document.getElementById("myUL").appendChild(li);
//   }
//   document.getElementById("myInput").value = "";
// };
