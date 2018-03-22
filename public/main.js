document.getElementById("form1").addEventListener('submit', () => {
  fetch('/shorten', {
    method: 'POST',
    body: { url: input1.value }
  })
    .then((resp) => resp.json())
    .then((data) => console.log(body))
    .catch(error => console.log(error))
})

// document.getElementById("form1").addEventListener('submit', functSubmit);

// function functSubmit(event) {
//   var msg = document.getElementById("input1").value;
//   alert(msg);
// }

// fetch(req)
//   .then((response) => {
//     if (response.ok) {
//       response.json();
//     } else {
//       throw new Error('Bad HTTP');
//     }
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log('ERROR', err.message)
//   })



// $('.btn-shorten').on('click', function(){

//   $.ajax({
//     url: '/shorten',
//     type: 'POST',
//     dataType: 'JSON',
//     data: {url: $('#url-field').val()},
//     success: function(data){
//         var resultHTML = '<a class="result" href="' + data.shortUrl + '">'
//             + data.shortUrl + '</a>';
//         $('#link').html(resultHTML);
//         $('#link').hide().fadeIn('slow');
//     }
//   });

// });