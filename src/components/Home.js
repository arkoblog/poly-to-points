var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var FileInput = require('react-file-input')
var Maps = require('./Maps')
var turfcentroid = require('@turf/centroid')
require("../css/file-input.css")
// Load Components
// var MyMap = require('./Maps')


var Home = React.createClass({
    getInitialState: function() {
        return {input: {}, output: {}}
    },
    addDownload: function(olddata) {
            var data = JSON.stringify(olddata);
            var blob = new Blob([data], {type: "application/json"});
            var url  = URL.createObjectURL(blob);

            var header = document.createElement('h4');
            header.textContent = "3. Download updated geojson";


            var a = document.createElement('a');
            a.download    = "polygons_to_point.json";
            a.href        = url;
            a.textContent = "Click here to download";
            a.className += " custom-link" 

            document.getElementById('download-container').appendChild(header);
            document.getElementById('download').appendChild(a);
    },
    makeChanges: function(olddata) {
        console.log("My input for the graph", this.state.input)
        // var olddata = this.state.backup
        // console.log("This",this)
        // console.log
        olddata.features.map(function(feature){
         1   // console.log(feature)
            if (feature.geometry.type === 'Polygon') {
                            // console.log('Polygon detected', feature);
                            var centroid = turfcentroid(feature);
                            var lon = centroid.geometry.coordinates[0];
                            var lat = centroid.geometry.coordinates[1];
                            feature.geometry.coordinates = [lon,lat]
                            feature.geometry.type = "Point"

            } else {
                // console.log(feature)
            }

        // this.updateOutput(olddata)

        })

        console.log("Is it true",olddata==this.state.input)

        this.setState({
            input:this.state.input,
            output : olddata
        }, this.addDownload(olddata))


    },
    onFileInput: function(e) {
        // Read file
        var fr = new FileReader();
        fr.onload = onReaderLoad;          
        fr.readAsText(e.target.files[0]);


        function onReaderLoad(event){
                // console.log(event.target.result);
                var obj = JSON.parse(event.target.result);
                updateState(obj)
                // alert_data(obj.name, obj.family);
        }
        // Update State
        var that = this
        function updateState(data) {
           // console.log(data)
           that.setState({
                input: data
           }, that.makeChanges(data)) 
          // console.log(obj)
        }

    },
    componentDidMount: function() {},
    render: function() {
        return (
            <div>
                <nav className="navbar navbar-default">
                  <div className="container-fluid">
                    <div className="navbar-header">
                      <a className="navbar-brand" href="#">Polygons to Points - A simple tool.</a>
                    </div>
                  </div>
                </nav>       
                <div className = "container">
                    <div className = "row">
                        <div className = "col-md-12"><h4>1. Upload GeoJSON File</h4></div>
                        <div className = "col-md-12">
                            <form>

                            <input type="file" name="file" onChange = {this.onFileInput} id="file" className="file-input" />
                            <label htmlFor="file">Choose a file</label>
                            </form>

                        </div>
                    </div>
                    <div className = "row">
                        <div className = "col-md-12">
                            <h4>2. View Updated GeoJSON</h4>
                            <Maps.Multi id = "2" data = {this.state.output}/>

                        </div>
                    </div>
                    <div className = "row" >
                        <div className = "col-md-12" >
                            <div id = "download-container"></div>
                            <div id = "download"></div>
                        </div>
                    </div>

                </div>         
			</div>
        )
    }
})

module.exports = Home;
