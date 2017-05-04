var React = require('react');
var ReactDOM = require('react-dom')
var L = require('leaflet')


var markerLayer;

var Multi = React.createClass({
    getInitialState: function() {
        var maxWindowHeight = 300
        return {
            height: maxWindowHeight,
            isLoading: false,
            customOptions: { 'maxWidth': '600' }
        }
    },

    rendermap: function() {

        var string = "map" + this.props.id 


        window[string] = this.map = L.map(ReactDOM.findDOMNode(this)).setView([28.207, 83.992], 12);
        L.tileLayer('https://api.mapbox.com/styles/v1/arkoblog/ciy2j6jja00g52sqdi7u4114x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJrb2Jsb2ciLCJhIjoiY2l5MmczdzJyMDAxODJxcDY5NHMyeHpkMyJ9.la6WiYXrUzF1Iy4aST9tnA', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors <br> Website developed by <a target = "_blank" href="http://kathmandulivinglabs.org">Kathmandu Living Labs</a>'
        }).addTo(window[string]);
        // L.control.scale().addTo(map)

    },


    removeSearchBar : function(){
        this.map.removeControl(this.searchControl);
    },


    addMarkers: function(data) {
        if (JSON.stringify(data) != "{}") {
            markerLayer = L.geoJSON().addTo(this.map);
            markerLayer.addData(data);
            this.map.fitBounds(markerLayer.getBounds())
        }
    },

    updateMarkers: function(data) {
        if(this.map.hasLayer(markerLayer)) {

         this.map.removeLayer(markerLayer)
        }
        this.addMarkers(data)
    },

    updateDimensions: function() {
        var maxWindowHeight = 300;
        this.setState({
            height: maxWindowHeight
        })
    },


    componentDidMount: function() {
        this.rendermap();
        this.addMarkers(this.props.data);
        window.addEventListener("resize", this.updateDimensions);
    },


    componentDidUpdate: function() {
        console.log("mydata",this.props.id, this.props.data)
        this.updateMarkers(this.props.data);
        // this.addMarkers(this.props.data);

    },

    render: function() {
        return (
            <div>
                <div id={this.props.id} className="clearfix" style={{height:this.state.height}}>
                </div> 
            </div>
        )

    }
})

module.exports = {
    Multi:Multi
}
