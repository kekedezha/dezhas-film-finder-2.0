"use client"

import { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// API key for The Movie Database
const tmdbKey = process.env.NEXT_PUBLIC_TMDB_KEY;
// The Movie Database beginning url 
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
// Genre Form Schema
const GenreFormSchema = z.object({
    genre: z
        .string({
            required_error: "Please select a genre!"
        })
})

type GenreProps = {
    updateSelectedGenre: (genreSelectedByUser:string)=>void;
}

export const GenreForm: React.FC<GenreProps> = ({ updateSelectedGenre }) => {
    // Initialize state with an empty array of the specified type
    const [genres, setGenres] = useState<string[]>([]);

    const form = useForm<z.infer<typeof GenreFormSchema>>({
        resolver: zodResolver(GenreFormSchema),
    })

    useEffect(() => {

        const getGenres = async() => {
            const genreRequestEndpoint = '/genre/movie/list';
            // Query string that will be appended to end of url 
            const requestParam = `?api_key=${tmdbKey}`;
            // Full url to get movie genres
            const urlToFetch = tmdbBaseUrl+genreRequestEndpoint+requestParam;
        
            try 
            {
                // Await GET request and save promise to response
                const response = await fetch(urlToFetch);
                // If promise has a truthy value then execute if statement
                if(response.ok) {
                    // Await the response promise to be converted to a json object.
                    const jsonResponse = await response.json();
                    const fetchedGenres = jsonResponse.genres.map((genre: { name: string }) => genre.name);
                    setGenres(fetchedGenres); // Update genres state with fetched genres
                }
            } catch(error) {
                console.log(error);
            }
        }

        getGenres();

    }, [])


    const onSubmit = (data: z.infer<typeof GenreFormSchema>) => {
        updateSelectedGenre(data.genre);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField 
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Movie Genre: </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="What genre are you feeling?" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {genres.map((genreItem) => (
                                        <SelectItem key={genreItem} value={genreItem}>{genreItem}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Generate</Button>
            </form>
        </Form>
    )
}