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
  const [loginData, setLoginData] = useState(0);
  const [topEvents, setTopEvents] = useState();

  useEffect(() => {
    //get players count
    axios.get('http://localhost/user/v1/api/auth/users/players-count')
    .then((response) => {
      setPlayerCount(response.data.count);
    })
    .catch((error) => {
      console.error("There was an error fetching players count!", error);
    });

    //get brands count
    axios.get('http://localhost/user/v1/api/auth/users/brands-count') // Replace with your Cloudinary cloud name
    .then((response) => {
      setBrandCount(response.data.count);
    })
    .catch((error) => {
      console.error("There was an error fetching brands count!", error);
    });

    //get events count
    axios.get('http://localhost/brand/api/v1/event/happening/count') // Replace with your Cloudinary cloud name
    .then((response) => {
      setEventCount(response.data.count);
    })
    .catch((error) => {
      console.error("There was an error fetching brands count!", error);
    });

    const now = new Date();
    const lastMonth = new Date(now);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const dateObject = {
      startDay: "2024-08-18", // Format as YYYY-MM-DD
      endDay: "2024-08-24"
    };
    
    //get login data
    axios.post('http://localhost/auth/v1/api/auth/statistic', dateObject) // Replace with your Cloudinary cloud name
    .then((response) => {
      setLoginData(response.data.data);
    })
    .catch((error) => {
      console.error("There was an error fetching login data!", error);
    });

    //get top favorited events data
    axios.get('http://localhost/user/v1/api/auth/favorite/event/top4') // Replace with your Cloudinary cloud name
    .then((response) => {
      setTopEvents(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("There was an error fetching login data!", error);
    });


  },[])

  //login data sample
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
    { name: '2024-08-28', HQTrivia: 65, DiceRoll: 28 },
    { name: '2024-08-29', HQTrivia: 59, DiceRoll: 48 },
    { name: '2024-08-20', HQTrivia: 80, DiceRoll: 40 },
    { name: '2024-08-21', HQTrivia: 81, DiceRoll: 19 },
    { name: '2024-08-22', HQTrivia: 56, DiceRoll: 86 },
    { name: '2024-08-23', HQTrivia: 56, DiceRoll: 86 },
    { name: '2024-08-24', HQTrivia: 56, DiceRoll: 86 },
  ];

  const products = [
    { id: 1, name: 'Weekend Trivia Extravaganza', sales: 45 },
    { id: 2, name: 'Lucky Dice Draw', sales: 29 },
    { id: 3, name: 'Trivia Night Showdown', sales: 18 },
    { id: 4, name: 'Dice Roll Madness', sales: 25 },
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
        <h2>User login record</h2>
        <div className="stats-container">
          <Barchart data={loginData}/>
        </div>
      </div>
      
      <div className='stats-banner' style={{height:400}}>
        <h2>Number of on going events created associated with games</h2>
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
            <Area type="monotone" dataKey="HQTrivia" stroke="#8884d8" fill="#8884d8" fillOpacity={0.1} />
            <Line type="monotone" dataKey="HQTrivia" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Area type="monotone" dataKey="DiceRoll" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.1} />
            <Line type="monotone" dataKey="DiceRoll" stroke="#82ca9d" />
          </LineChart> 
        </div>
      </div>

      <div className='stats-banner' style={{height:300}}>
        {topEvents && <TopProductsListView data={topEvents}/>}
      </div>
    </div>
  )
}

export default AdminDashboard