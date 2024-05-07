"use client";

import { GenreForm } from "@/components/GenreSelection";
import { MovieView } from "@/components/MovieComponent";
import { useState } from "react";

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<number>();

  const updateSelectedGenre = (genreSelectedByUser: number) => {
    setSelectedGenre(genreSelectedByUser);
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-10 px-24">
      <div className="z-10 w-full max-w-5xl mb-3 items-center justify-between font-sans text-sm lg:flex">
        <p className="text-sm text-slate-400 fixed left-0 top-0 flex max-w-66 justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          Welcome to Dezha&#39;s Film Finder!
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <h1 className="text-5xl">
            Film Finder 🎥
          </h1>
        </div>
      </div>

      <p className="text-sm text-center fixed left-0 flex max-w-66 justify-center bg-gradient-to-t from-white via-white mb-4 dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          Having trouble picking a movie? <br/>
          Select genres and/or add more filters to generate your next movie to watch!
      </p>

      <div className="min-h-80 text-center flex flex-col justify-center align-center space-y-6">
        <GenreForm updateSelectedGenreId={updateSelectedGenre} />
        <MovieView genre={selectedGenre} />

      </div>
    </main>
  );
}
