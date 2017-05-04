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
        }
        // markerLayer = new L.featureGroup;
        // console.log(data)
        // // data.features.map(function(d, i) {
        // //     var marker = new L.marker([d.geometry.coordinates[1], d.geometry.coordinates[0]]).addTo(markerLayer)
        // //         // .bindPopup(PopupHelpers.getPopupContent(this.props.type, d.properties.tags, d.properties.id), this.state.customOptions)
        // //     // $('body').on('click', '#button' + d.properties.id, function(){this.onEditClick(d)}.bind(this));
        // // }.bind(this));

        // markerLayer.addTo(this.map);


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

var Single = React.createClass({
    getInitialState: function() {
        var maxWindowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 455;
        return {
            height: maxWindowHeight,
            isLoading: false,
            customOptions: { 'maxWidth': '600' }
        }
    },

    rendermap: function(data) {
        var map = this.map = L.map(ReactDOM.findDOMNode(this)).setView([data.geometry.coordinates[1], data.geometry.coordinates[0]], 24);
        L.tileLayer('https://api.mapbox.com/styles/v1/arkoblog/ciy2j6jja00g52sqdi7u4114x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJrb2Jsb2ciLCJhIjoiY2l5MmczdzJyMDAxODJxcDY5NHMyeHpkMyJ9.la6WiYXrUzF1Iy4aST9tnA', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    },

    addMarkers: function(data) {
        markerLayer = new L.featureGroup;

        var marker = new L.marker([data.geometry.coordinates[1], data.geometry.coordinates[0]]).addTo(markerLayer)
        markerLayer.addTo(this.map);
        markerLayer.bindPopup('<strong>Name: </strong>'+data.properties.tags.name).openPopup()

    },

    updateMarkers: function(data) {
        this.map.removeLayer(markerLayer)
        this.addMarkers(data)
    },

    updateDimensions: function() {
        var maxWindowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 455;
        this.setState({
            height: maxWindowHeight
        })
    },


    componentDidMount: function() {
        this.rendermap(this.props.data);
        this.addMarkers(this.props.data);
        window.addEventListener("resize", this.updateDimensions);
    },


    componentDidUpdate: function() {
        this.updateMarkers(this.props.data);
    },

    render: function() {
        return (
            <div id={this.props.id} className="clearfix" style={{height:this.state.height}}>
            </div> 
        )

    }


})

module.exports = {
    Multi:Multi,
    Single: Single
}
