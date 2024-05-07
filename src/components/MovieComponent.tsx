
import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image';

// The Movie Database Access Token 
const tmdbAccessToken = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
// The Movie Database beginning url 
const tmdbBaseUrl = 'https://api.themoviedb.org/3';  

const fetchOptions = {
    method: 'GET', 
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${tmdbAccessToken}`
  }
}

const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit"
}


type MovieProps = {
    genre: number | undefined,
    genButtonToggle: boolean,
}

export const MovieView: React.FC<MovieProps> = ({ genre, genButtonToggle }) => {
    const [movieTitleToDisplay, setMovieTitleToDisplay] = useState<string>("");
    const [moviePosterToDisplay, setMoviePosterToDisplay] = useState<string>("");
    const [movieReleaseDateToDisplay, setReleaseDateToDisplay] = useState<Date>();
    const [movieRuntimeToDisplay, setMovieRuntimeToDisplay] = useState<number>();
    const [movieOverviewToDisplay, setMovieOverviewToDisplay] = useState<string>("");


    useEffect(() => {
        const getRandomMovie = async() => {
            // Movie discover endpoint
            const discoverMovieEndpoint = '/discover/movie';
            const requestParams = `?with_genres=${genre}`;
            const urlToFetch = tmdbBaseUrl+discoverMovieEndpoint+requestParams;
        
            try {
                const response = await fetch(urlToFetch, fetchOptions);
        
                if(response.ok) {
                    const jsonResponse = await response.json();
                    const movies = jsonResponse.results;
                    const index: number = Math.floor(Math.random() * movies.length);
                    setMovieTitleToDisplay(movies[index].title);
                    setMoviePosterToDisplay("https://image.tmdb.org/t/p/original" + movies[index].poster_path);
                    setReleaseDateToDisplay(new Date(movies[index].release_date))
                    
                    return movies[index].id;
                }
            } catch(error) {
                console.log(error);
            };
        
        };

        const getMovieDetails = async() => {
            const movieId = await getRandomMovie();
            const movieDetailsEndpoint = '/movie/'
            const urlToFetch = tmdbBaseUrl+movieDetailsEndpoint+movieId

            try {
                const response = await fetch(urlToFetch, fetchOptions)

                if (response.ok) {
                    const jsonResponse = await response.json();
                    setMovieRuntimeToDisplay(jsonResponse.runtime);
                    setMovieOverviewToDisplay(jsonResponse.overview);
                }
            } catch(error) {
                console.log(error)
            }
        }
     
        getMovieDetails();

    }, [genre, genButtonToggle])

    if (genre == undefined) {
        return (
            <></>
        )
    }    
    return (
        <div className='flex flex-col justify-center'>
            <Card className='flex flex-col justify-center'>
                <CardHeader>
                    <CardTitle>{movieTitleToDisplay}</CardTitle>
                </CardHeader>
                <CardContent className='mx-auto'>
                    <Image
                        src={moviePosterToDisplay}
                        alt="Movie Poster"
                        width={400}
                        height={650}
                        style={{width:'auto', height:'auto'}}
                    />
                </CardContent>
                <div className="grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left mx-auto">
                    <div
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-slate-900 hover:dark:border-neutral-400 hover:dark:bg-neutral-400/30"
                    >
                        <h2 className="mb-3 text-2xl font-semibold">
                            Overview:{" "}
                        </h2>
                        <p className="m-0 max-w-[30ch] text-sm opacity-50">
                            {movieOverviewToDisplay}
                        </p>
                    </div>
                    <div
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-slate-900 hover:dark:border-neutral-400 hover:dark:bg-neutral-400/30"
                    >
                        <h2 className="mb-3 text-2xl font-semibold">
                            Runtime:{" "}
                        </h2>
                        <p className="m-0 max-w-[30ch] text-sm opacity-50">
                            {movieRuntimeToDisplay} minutes
                        </p>
                    </div>
                    <div
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-slate-900 hover:dark:border-neutral-400 hover:dark:bg-neutral-400/30"
                    >
                        <h2 className="mb-3 text-2xl font-semibold">
                            Release Date:{" "}
                        </h2>
                        <p className="m-0 max-w-[30ch] text-sm opacity-50">
                            {new Intl.DateTimeFormat("en-US", dateOptions).format(movieReleaseDateToDisplay)}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    )
}