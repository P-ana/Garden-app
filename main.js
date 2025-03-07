//First page

$(document).ready(function () {
    const error=$("#error");
    const gardenName=$("#name");
    const gardenSurface = $("#surface");
    const input=$("input");
    const btn=$("#btn");

    btn.click(function(){
    if(gardenName.val().trim() == "" ||  gardenSurface.val().trim() == ""){
        error.text("Please, fill out all the fields below");
    }
    else {
        // Store user input in localStorage
        localStorage.setItem("gardenName", gardenName.val().trim());
        localStorage.setItem("gardenSurface", gardenSurface.val().trim());
        // Redirect to second.html (opens in the same tab)
        window.location.href = "second.html"; 
    }
    });
});

//Second page
$(document).ready(function () {
    // Retrieve data from localStorage
    let gardenName2 = localStorage.getItem("gardenName");
    let gardenSurface2 = localStorage.getItem("gardenSurface");

    // Display garden details
    $("#gardenTitle").text(`🌿 Welcome to ${gardenName2} garden!`);
    $("#gardenInfo").text(`Surface Area: ${gardenSurface2} m²`);

    const MAX_PLANTS_PER_PLOT=35;

    $("#addPlant").click(function () {
    let selectedOption=$("#plant option:selected");// Get selected option
    let selectedValue = selectedOption.val(); 
    let info = $("#info");
    

    if(selectedValue === ""){
        info.text("Please, choose a plant");
    }
    
    // Determine which plot to add the selected plant to
    let targetPlot="";
    if (["🍆", "🫑", "🥒", "🥔","🍅"].includes(selectedValue)) {
            targetPlot = "#one";
    } else if (selectedValue === "🥦") {
            targetPlot = "#two";
    } else if (["🥕", "🧅", "🫘"].includes(selectedValue)) {
            targetPlot = "#three";
    } else if (["🥬", "🫛"].includes(selectedValue)) {
            targetPlot = "#four";
        } 
    else {
        info.text("This type of plant is not supported in this garden");
        return;
    } 
    
    // Check if the plot is already full
    if($(targetPlot).children(".plant-item").length >MAX_PLANTS_PER_PLOT){
        info.text("This is maximum number of plant");
       $("#gardenTitle").text("");
        $("#gardenInfo").text("");
        return; 
    } 
    
    // Append selected plant to the correct plot
    $(targetPlot).append(`<span class="plant-item">${selectedValue} </span>`);
    info.text(""); // Clear error message if selection is valid
});
    
    // Create the plot
    $("#createGarden").click(function(){
      let allPlants=$(".plant-item");

      if(allPlants.length ===0){
        $("#info").text("Please, add plants to your garden before proceeding.");
        return;
      }
      // Store garden data (name, surface, and plants) in localStorage
      let garden = {
        name: gardenName2,
        surface: gardenSurface2,
        plants: allPlants.map(function() { return $(this).text().trim(); }).get()
    };

    localStorage.setItem("garden", JSON.stringify(garden));

    // Redirect to third.html
    window.location.href = "third.html";
});

});


//Third page

$(document).ready(function () {
    // Retrieve the garden data from localStorage
    let garden = localStorage.getItem("garden");
    
    if (!garden) {
        $("#finish").text("No garden data found.");
        return;
    }  

    garden = JSON.parse(garden); // Convert the stored string into an object
    
    // Check if the garden has plants
    if (garden.plants && garden.plants.length > 0) {
        // Loop through the plants and append them to the corresponding plot
        garden.plants.forEach(function(plant) {
            // Append plant to the appropriate plot based on its emoji or name
        if (["🍆", "🫑", "🥒", "🥔","🍅"].includes(plant)) {
                $("#first").append(`<span class="plant-item">${plant}</span>`);
        } else if (plant === "🥦") {
                $("#second").append(`<span class="plant-item">${plant}</span>`);
        } else if (["🥕", "🧅", "🫘"].includes(plant)) {
                $("#third").append(`<span class="plant-item">${plant}</span>`);
        } else if (["🥬", "🫛"].includes(plant)) {
                $("#fourth").append(`<span class="plant-item">${plant}</span>`);
        }
        }); 
        } else {
        // If no plants, show a message
        $("#finish").text("No plants have been added to your garden yet.").css({"color":"#F6D96E","font-size":"1rem","font-weight": "bold"});
    }
});

//Start again

$(document).ready(function () {
    if (window.location.pathname.includes("third.html")) { // Only run on third.html
        $(document).on("keypress", function(event) {
            if (event.key.toLowerCase() === "a") {  // Check if 'A' is pressed
                localStorage.clear();
                window.location.href = "index.html"; // Redirect to start
            }
        });
    }
});

    
   


