function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data); //samples, metadata, names
    console.log(sample);

    // 3. Create a variable that holds the samples array. 
    var allSamples = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredSamples = allSamples.filter(sampleBact=> sampleBact.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var firstSample = filteredSamples[0];
    console.log(firstSample);
    
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = firstSample.otu_ids;
    var otuLabel = firstSample.otu_labels;
    var otuValue = firstSample.sample_values;
    

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otuIds.slice(0,10).map(otu_Ids => `OTU ${otu_Ids}`).reverse();
    

    // 8. Create the trace for the bar chart. 
    var trace = {
      x: otuValue.slice(0,10).reverse(),
      y: yticks,
      type: "bar",
      orientation: "h"
    };
    
    var barData = [trace
      
    ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacterias",
      xaxis: { title: "OTU Count" },
      yaxis: { title: "OTU ID"}
      
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar-plot", barData, barLayout);
  
  // });
// }
// // Bar and Bubble charts
// // Create the buildCharts function.
// function buildCharts(sample) {
  
//   // Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {
//     console.log(data); //samples, metadata, names
//     console.log(sample);
    
//     var otuIds = firstSample.otu_ids;
//     var otuLabel = firstSample.otu_labels;
//     var otuValue = firstSample.sample_values;
//     // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    // Plotly.newPlot(); 
// console.log(otu_ids)
    // 1. Create the trace for the bubble chart.
    var trace = {
      x: otuIds,
      y: otuValue,
      //text: ['otuIds, otuValue, Bacteria;otuLabel',
      text: otuLabel, 

    //],
      mode: 'markers',
      marker: {
         color: ['rgb(600, 164, 200)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)',
         'rgb(93, 169, 214)', 'rgb(155, 220, 14)',  'rgb(144, 160, 1101)', 'rgb(155, 165, 354)',
         'rgb(249, 160, 301)', 'rgb(225, 100, 54)'],
        //colors: otuIds,
    //opacity: [1, 0.8, 0.6, 0.4],
    size: otuValue
      
    }};
    
    var bubbleData = [trace
   
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      xaxis: { title: "OTU ID" },
      yaxis: { title: ""}
      //height: 600,
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble-plot", bubbleData, bubbleLayout); 
  // });
// Gauge chart starts here
// // Create the buildChart function.
// function buildCharts(sample) {
//   // Use d3.json to load the samples.json file 
//   d3.json("samples.json").then((data) => {
//     console.log(data);

    // Create a variable that holds the samples array.
    var allMetadata = data.metadata; 

    // Create a variable that filters the samples for the object with the desired sample number.
    
console.log(allMetadata)
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var filteredMetadata = allMetadata.filter(washingFreq => washingFreq.id == sample);
    // Create a variable that holds the first sample in the array.
    
  

    // 2. Create a variable that holds the first sample in the metadata array.
    //var meta = firstMetadata.wfreq;
    var firstMetadata = filteredMetadata[0];

    

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    //var otuIds = firstSample.otu_ids;
    //var otuLabel = firstSample.otu_labels;
    //var otuValue = firstSample.sample_values;

    // 3. Create a variable that holds the washing frequency.
    var washFreq = firstMetadata.wfreq;
    console.log(washFreq)
   
    // Create the yticks for the bar chart.
    //var yticks = otuIds.slice(0,10).map(otu_Ids => `OTU ${otu_Ids}`).reverse();

    // Use Plotly to plot the bar data and layout.
    //Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    //Plotly.newPlot();

    var trace = 
      {
        domain: { x: [0, 1], y: [0, 1] },
        
        value: washFreq,
        
        //value: 2,
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          steps: [
            {range: [0, 2], color: "red"},
            {range: [2, 4], color: "orange"},
            {range: [4, 6], color: "yellow"},
            {range: [6, 8], color: "green"},
            {range: [8, 10], color: "blue"}  
            //{bar: { color: "darkblue" }}

          ]
          
      }
      };
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [trace
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
       
      title: { text: "Belly Button Washing Frequency<br>Scrubs per week" },
      //{ width: 600, height: 450, margin: { t: 0, b: 0 } },
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });


}

