import React, {useState,useEffect} from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts';
import { Chart } from 'react-google-charts';
import axios from 'axios';

import "./AdminDashboard.css"
import barcharticon from "../../assets/bar-chart-icon.png"
import note_icon from "../../assets/note-icon.png"
import tag_icon from "../../assets/tag-icon.png"
import StatBox from '../../../components/StatBox'
import TopProductsListView from '../../../components/TopProductsListView';
import Barchart from '../../../components/Barchart';

function AdminDashboard() {
  const [playerCount, setPlayerCount] = useState(0);
  const [brandCount, setBrandCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    //get players count
    axios.get('http://localhost:3001/v1/api/auth/users/players-count')
    .then((response) => {
      setPlayerCount(response.data.count);
    })
    .catch((error) => {
      console.error("There was an error fetching players count!", error);
    });

    //get brands count
    axios.get('http://localhost:3001/v1/api/auth/users/brands-count') // Replace with your Cloudinary cloud name
    .then((response) => {
      setBrandCount(response.data.count);
    })
    .catch((error) => {
      console.error("There was an error fetching brands count!", error);
    });

    //get events count
    //axios.get('http://localhost:3001/v1/api/auth/users/brands-count') // Replace with your Cloudinary cloud name
    //.then((response) => {
    //  setBrandCount(response.data.count);
    //})
    //.catch((error) => {
    //  console.error("There was an error fetching brands count!", error);
    //});
  },[])

  const revenueData = [
    { name: 'Monday', Online: 4000, Offline: 2400 },
    { name: 'Tuesday', Online: 3000, Offline: 1398 },
    { name: 'Wednesday', Online: 2000, Offline: 9800 },
    { name: 'Thursday', Online: 2780, Offline: 3908 },
    { name: 'Friday', Online: 1890, Offline: 4800 },
    { name: 'Saturday', Online: 2390, Offline: 3800 },
    { name: 'Sunday', Online: 3490, Offline: 4300 },
  ];

  const customerData = [
    { name: 'Point 1', Last: 65, This: 28 },
    { name: 'Point 2', Last: 59, This: 48 },
    { name: 'Point 3', Last: 80, This: 40 },
    { name: 'Point 4', Last: 81, This: 19 },
    { name: 'Point 5', Last: 56, This: 86 },
  ];

  const products = [
    { id: 1, name: 'Home Decor', popularity: 80, sales: 45 },
    { id: 2, name: 'Disney Princess', popularity: 60, sales: 29 },
    { id: 3, name: 'Bathroom', popularity: 40, sales: 18 },
    { id: 4, name: 'Apple', popularity: 20, sales: 25 },
  ];

  const mapChartSampleData = [
    ['Country', 'Popularity'],
    ['Germany', 200],
    ['United States', 300],
    ['Brazil', 400],
    ['Canada', 500],
    ['France', 600],
    ['RU', 700]
  ]

  return (
    <div>
      <div className="stats-banner">
        <h2>Stats</h2>
        <div className="stats-container">
          <StatBox 
            icon={barcharticon}
            statNumber={playerCount}
            statTitle="Total Players"
            statSubtitle="+8% from yesterday"
            backgroundColor="#FCE9EC"
          />

          <StatBox 
            icon={note_icon}
            statNumber={brandCount}
            statTitle="Total Brands"
            statSubtitle="+5% from yesterday"
            backgroundColor="#FEF3E6"
          />

          <StatBox 
            icon={tag_icon}
            statNumber={eventCount}
            statTitle="On Going Events"
            statSubtitle="+8% from yesterday"
            backgroundColor="#E9FAEF"
          />
        </div>
      </div>

      <div className='stats-banner' style={{height:400}}>
        <h2>Bars Chart</h2>
        <div className="stats-container">
          <Barchart data={revenueData}/>
        </div>
      </div>
      
      <div className='stats-banner' style={{height:400}}>
        <h2>Line Chart</h2>
        <div className="stats-container">
          <LineChart
            width={500}
            height={300}
            data={customerData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="Last" stroke="#8884d8" fill="#8884d8" fillOpacity={0.1} />
            <Line type="monotone" dataKey="Last" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Area type="monotone" dataKey="This" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.1} />
            <Line type="monotone" dataKey="This" stroke="#82ca9d" />
          </LineChart> 
        </div>
      </div>
      <div className='stats-banner' style={{height:300}}>
        <TopProductsListView data={products}/>
      </div>
      
      <div className='stats-banner' style={{height:400}}>
        <h2>Map Chart</h2>
        <div className="stats-container">
          <div className="App">
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="GeoChart"
              data={mapChartSampleData}
              options={{
                colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },
              }}
              mapsApiKey=""
              rootProps={{ 'data-testid': '1' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard