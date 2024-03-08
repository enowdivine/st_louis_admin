import DashboardStats from './components/DashboardStats'
// import AmountStats from './components/AmountStats'
// import PageStats from './components/PageStats'

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import ClipboardIcon from '@heroicons/react/24/outline/ClipboardIcon'
import HomeModernIcon from '@heroicons/react/24/outline/HomeModernIcon'
import BookmarkSquareIcon from '@heroicons/react/24/outline/BookmarkSquareIcon'
import QueueListIcon from '@heroicons/react/24/outline/QueueListIcon'
import BookOpenIcon from '@heroicons/react/24/outline/BookOpenIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
// import UserChannels from './components/UserChannels'
// import LineChart from './components/LineChart'
// import BarChart from './components/BarChart'
// import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice'
// import DoughnutChart from './components/DoughnutChart'
import { useState, useEffect } from 'react'
import {
    getEvents, getTeam,
    getCampuses, getProgrammes, getCategories, getCourses
} from '../../app/reducers/app'

function Dashboard() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([])
    const [upcomingEvents, setUpcomingEvents] = useState([])
    const [members, setMembers] = useState([])
    const [campuses, setCampuses] = useState([])
    const [programmes, setProgrammes] = useState([])
    const [categories, setCategories] = useState([])
    const [courses, setCourses] = useState([])

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

    const handlerGetCampuses = async () => {
        try {
            setLoading(true)
            await dispatch(getCampuses()).then((res) => {
                if (res.meta.requestStatus === "rejected") {
                    showNotification({ message: res.payload, status: 0 })
                    setLoading(false)
                    return
                }
                setCampuses(res.payload)
                setLoading(false)
            }).catch((err) => {
                console.error(err)
                setLoading(false)
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handlerGetProgrammes = async () => {
        try {
            setLoading(true)
            await dispatch(getProgrammes()).then((res) => {
                if (res.meta.requestStatus === "rejected") {
                    showNotification({ message: res.payload, status: 0 })
                    setLoading(false)
                    return
                }
                setProgrammes(res.payload)
                setLoading(false)
            }).catch((err) => {
                console.error(err)
                setLoading(false)
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handlerGetCategories = async () => {
        try {
            setLoading(true)
            await dispatch(getCategories()).then((res) => {
                if (res.meta.requestStatus === "rejected") {
                    showNotification({ message: res.payload, status: 0 })
                    setLoading(false)
                    return
                }
                setCategories(res.payload)
                setLoading(false)
            }).catch((err) => {
                console.error(err)
                setLoading(false)
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handlerGetCourses = async () => {
        try {
            setLoading(true)
            await dispatch(getCourses()).then((res) => {
                if (res.meta.requestStatus === "rejected") {
                    showNotification({ message: res.payload, status: 0 })
                    setLoading(false)
                    return
                }
                setCourses(res.payload)
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
        handlerGetCampuses()
        handlerGetProgrammes()
        handlerGetCategories()
        handlerGetCourses()
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
        { title: "Events", value: `${events?.length}`, icon: <CalendarDaysIcon className='w-8 h-8' />, description: "" },
        { title: "Upcoming Events", value: `${upcomingEvents?.length}`, icon: <ClipboardIcon className='w-8 h-8' />, description: "" },
        { title: "Past Events", value: `${events?.length - upcomingEvents?.length}`, icon: <ClipboardIcon className='w-8 h-8' />, description: "" },
        { title: "Team", value: `${members?.length}`, icon: <UserGroupIcon className='w-8 h-8' />, description: "" },

        { title: "Campuses", value: `${campuses?.length}`, icon: <HomeModernIcon className='w-8 h-8' />, description: "" },
        { title: "Programmes", value: `${programmes?.length}`, icon: <BookmarkSquareIcon className='w-8 h-8' />, description: "" },
        { title: "Course Categories", value: `${categories?.length}`, icon: <QueueListIcon className='w-8 h-8' />, description: "" },
        { title: "Courses", value: `${courses?.length}`, icon: <BookOpenIcon className='w-8 h-8' />, description: "" },
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