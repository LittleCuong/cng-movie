import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import {FaAngleDown} from 'react-icons/fa'
import { useParams } from 'react-router-dom';
import tmdApi from "~/api/tmdbApi";
import Header from '~/layouts/Header/Header.js';
import styles from './MovieTypeLayout.module.scss'
import Movie from '~/components/Movie/Movie';


import HeadlessTippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles)

function MovieTypeLayout() {
    window.scrollTo(0,0)
    
    // Variables 
    var title = ''

    //useState 

    // type tu tren URL
    const { type } = useParams()
    
    // useState
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])

    // useEffect
    useEffect(() => {
        const getMovies = async () => {
            const params = {}
            const response = await tmdApi.getMovieList(type, {params});
            setMovies(response.results) 
        }
        getMovies()
        const getGenres = async () => {
            const params = {}
            const res = await tmdApi.genres({params});
            setGenres(res.genres)
        }
        getGenres()
    }, [type])

    // Headers 
    if (type === 'popular') {
        title = 'Popular'
    } else if (type === 'top_rated') {
        title = 'Top Rated'
    } else if (type === 'upcoming'){
        title = 'Upcoming'
    } else {
        title = 'Similar'
    }

    // Handle click
    const sortByPopularAscending = () => {
        // sortedMovies la copy array cua state movies
        const sortedMovies = [...movies].sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1)
        setMovies(sortedMovies)
    }

    const sortByPopularDescending = () => {
        const sortedMovies = [...movies].sort((a, b) => (a.vote_average > b.vote_average) ? 1 : -1)
        setMovies(sortedMovies)
    }

    const sortTitleAccesding = () => { 
        const sortedMovies = [...movies].sort((a, b) => (a.title > b.title) ? 1 : -1)
        setMovies(sortedMovies)
    }

    const sortTitleDescending = () => {
        const sortedMovies = [...movies].sort((a, b) => (a.title < b.title) ? 1 : -1)
        setMovies(sortedMovies)
    }

    const handleGenre = (data) => {
        const getMovie = async () => {
            const params= {}
            const response = await tmdApi.discover(data, {params});
            console.log(response.results);
            setMovies(response.results)
        }
        getMovie()
    }

    return (
        <div className={cx('wrapper')}>
            <Header className={cx('propose-header')}/>
            <div className={cx('container')}>
                    <div className={cx('container-filters')}>
                        <h3 className={cx('container-header')}>{title}</h3>
                        <div className={cx('filter-sort')}>
                            <HeadlessTippy
                                interactive
                                // visible
                                inertia={true}
                                moveTransition='all 0.6s'
                                render={attrs => (                                    
                                    <div className={cx('filter-options')} tabIndex="-1" {...attrs}>                                  
                                        <button className={cx('filter-options-btn')} onClick={sortByPopularAscending}>
                                            <span>Popular Ascending</span>
                                        </button>
                                        <button className={cx('filter-options-btn')} onClick={sortByPopularDescending}>
                                            <span>Popular Descending</span>
                                        </button>
                                        <button className={cx('filter-options-btn')} onClick={sortTitleAccesding}>
                                            <span>Title (A-Z)</span>
                                        </button>
                                        <button className={cx('filter-options-btn')} onClick={sortTitleDescending}>
                                            <span>Title (Z-A)</span>
                                        </button>
                                    </div>                                       
                                )}
                            >
                                <button className={cx('sort-btn')}>
                                    <span>Sort results by</span>
                                    <FaAngleDown className={cx('angle-down')}/>
                                </button>
                            </HeadlessTippy>      
                        </div>
                        <div className={cx('filter-genre')}>
                            <HeadlessTippy
                                    interactive
                                    inertia={true}
                                    moveTransition='all 0.6s'
                                    render={attrs => (                                    
                                        <div className={cx('filter-options')} tabIndex="-1" {...attrs}>                                                             
                                            {genres.map(genre => (
                                                <button 
                                                    onClick={e => {handleGenre(genre.id)}}
                                                    key={genre.id}
                                                    data={genre} 
                                                    className={cx('filter-options-btn')}
                                                >
                                                    <span>{genre.name}</span>
                                                </button>
                                            ))}
                                        </div>                                       
                                    )}
                                >
                                    <button className={cx('sort-btn')}>
                                        <span>Genres</span>
                                        <FaAngleDown className={cx('angle-down')}/>
                                    </button>
                                </HeadlessTippy>
                        </div>
                    </div>
                <div className={cx('movies-list')}>        
                        {movies.map(movie => (
                            <Movie key={movie.id} data={movie}/>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default MovieTypeLayout;