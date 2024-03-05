import DashboardStats from './components/DashboardStats'
// import AmountStats from './components/AmountStats'
// import PageStats from './components/PageStats'

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import ClipboardIcon from '@heroicons/react/24/outline/ClipboardIcon'
// import UserChannels from './components/UserChannels'
// import LineChart from './components/LineChart'
// import BarChart from './components/BarChart'
// import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice'
// import DoughnutChart from './components/DoughnutChart'
import { useState, useEffect } from 'react'
import { getEvents, getTeam } from '../../app/reducers/app'

function Dashboard() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([])
    const [upcomingEvents, setUpcomingEvents] = useState([])
    const [members, setMembers] = useState([])


    const handlerGetEvents = async () => {
        try {
            setLoading(true)
            await dispatch(getEvents()).then((res) => {
                if (res.meta.requestStatus === "rejected") {
                    showNotification({ message: res.payload, status: 0 })
                    setLoading(false)
                    return
                }
                setEvents(res.payload)
                setLoading(false)
            }).catch((err) => {
                console.error(err)
                setLoading(false)
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handlerGetTeam = async () => {
        try {
            setLoading(true)
            await dispatch(getTeam()).then((res) => {
                if (res.meta.requestStatus === "rejected") {
                    showNotification({ message: res.payload, status: 0 })
                    setLoading(false)
                    return
                }
                setMembers(res.payload)
                setLoading(false)
            }).catch((err) => {
                console.error(err)
                setLoading(false)
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handlerGetEvents()
        handlerGetTeam()
    }, [])

    const getUpcomingEvents = () => {
        const currentDate = new Date();
        const filtered = events?.filter(item => {
            const dateObject = new Date(item?.date);
            return currentDate.getTime() < dateObject.getTime();
        });
        setUpcomingEvents(filtered);
    };

    useEffect(() => {
        getUpcomingEvents()
    }, [events])

    const statsData = [
        { title: "Events", value: `${events?.length}`, icon: <UserGroupIcon className='w-8 h-8' />, description: "" },
        { title: "Upcoming Events", value: `${upcomingEvents?.length}`, icon: <ClipboardIcon className='w-8 h-8' />, description: "" },
        { title: "Past Events", value: `${events?.length - upcomingEvents?.length}`, icon: <ClipboardIcon className='w-8 h-8' />, description: "" },
        { title: "Team", value: `${members?.length}`, icon: <UserGroupIcon className='w-8 h-8' />, description: "" },
    ]


    // const updateDashboardPeriod = (newRange) => {
    //     // Dashboard range changed, write code to refresh your values
    //     dispatch(showNotification({ message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status: 1 }))
    // }

    return (
        <>
            {/** ---------------------- Select Period Content ------------------------- */}
            {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/> */}

            {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k} />
                        )
                    })
                }
            </div>



            {/** ---------------------- Different charts ------------------------- */}
            {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
            </div> */}

            {/** ---------------------- Different stats content 2 ------------------------- */}

            {/* <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div> */}

            {/** ---------------------- User source channels table  ------------------------- */}

            {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div> */}
        </>
    )
}

export default Dashboard