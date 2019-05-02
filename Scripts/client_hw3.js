console.log('Client-side code running');

window.onload=function() {
    const button = document.getElementById('myButton');
    button.addEventListener('click', function (e) {
        $.ajax({
            type: 'GET',
            url: '/add_user.js',
            data: {name: document.getElementById("myInput").value}
        });
        console.log('button was clicked');
    });
}