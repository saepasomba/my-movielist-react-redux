import React, { useEffect, useState } from 'react'

import { apiGetUpcoming, apiGetPopular, apiGetTrending } from '../../api'
import CardList from '../../components/CardList/CardList'

import CustomCarousel from '../../components/CustomCarousel/CustomCarousel'

export default function Homepage() {

  const [headerMovies, setHeaderMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let trendingResponse = await apiGetTrending()
      let cutTrending = trendingResponse.data.results.slice(0, 5)
      setHeaderMovies(cutTrending)

      let popularResponse = await apiGetPopular()
      let cutPopular = popularResponse.data.results.slice(0, 10)
      setPopularMovies(cutPopular)

      let upcomingResponse = await apiGetUpcoming()
      let cutUpcoming = upcomingResponse.data.results.slice(0, 10)
      setUpcomingMovies(cutUpcoming)
    }
    fetchData()
  }, [])

  return (
    <>
      <CustomCarousel movies={headerMovies} />
      <CardList header={'Popular Movies'} movies={popularMovies} />
      <CardList header={'Upcoming Movies'} movies={upcomingMovies} />
    </>
  )
}