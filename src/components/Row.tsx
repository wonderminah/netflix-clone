import { useEffect, useState } from "react";
import axios from "../lib/axios"
import type { Movie } from "../types/movie";

interface RowProps {
    title: string
    fetchUrl: string
    isLargeRow: boolean
}

export default function Row({ title, fetchUrl, isLargeRow = false }: RowProps) {
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)

            console.log(request.data)
        }

        fetchData()
    }, [fetchUrl])

    return (
        <div className="mt-8">
            <h2 className="text-white text-xl font-bold mb-2">{title}</h2>
            <div className="flex space-x-2 overflow-x-scroll scrollbar-hide p-2">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        className={`rounded-md transition transform hover:scale-105 cursor-pointer ${isLargeRow ? "h-64" : "h-36"
                            }`}
                        src={`https://image.tmdb.org/t/p/w500${isLargeRow ? movie.poster_path : movie.backdrop_path
                            }`}
                        alt={movie.title || movie.name}
                    />
                ))}
            </div>
        </div>
    )
}

