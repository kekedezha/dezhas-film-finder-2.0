
import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image';

// The Movie Database Access Token 
const tmdbAccessToken = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
// The Movie Database beginning url 
const tmdbBaseUrl = 'https://api.themoviedb.org/3';  

const options = {
    method: 'GET', 
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${tmdbAccessToken}`
  }
}

type MovieProps = {
    genre: number | undefined;
}

export const MovieView: React.FC<MovieProps> = ({ genre }) => {
    const [movieTitleToDisplay, setMovieTitleToDisplay] = useState<string>("");
    const [moviePosterToDisplay, setMoviePosterToDisplay] = useState<string>("");

    useEffect(() => {
        const getMovies = async() => {
            // Movie discover endpoint
            const discoverMovieEndpoint = '/discover/movie';
            const requestParams = `?with_genres=${genre}`;
            const urlToFetch = tmdbBaseUrl+discoverMovieEndpoint+requestParams;
        
            try {
                const response = await fetch(urlToFetch, options);
        
                if(response.ok) {
                    const jsonResponse = await response.json();
                    console.log(jsonResponse);
                    const movies = jsonResponse.results;
                    const index: number = Math.floor(Math.random() * movies.length);
                    setMovieTitleToDisplay(movies[index].title);
                    setMoviePosterToDisplay("https://image.tmdb.org/t/p/original" + movies[index].poster_path);
                    console.log(movies[index].poster_path);
                }
        
            } catch(error) {
                console.log(error);
            };
        
        };
        getMovies();

    }, [genre])

    if (genre == undefined) {
        return (
            <></>
        )
    }    
    return (
        <Card className='flex flex-col justify-center'>
            <CardHeader>
                <CardTitle>{movieTitleToDisplay}</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <Image
                    src={moviePosterToDisplay}
                    alt="Movie Poster"
                    width={400}
                    height={650}
                />
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}