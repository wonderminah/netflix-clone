import { useEffect, useState } from "react";
import axios from "../lib/axios"
import type { Movie } from "../types/movie";

interface RowProps {
    title: string
    fetchUrl: string
    isLargeRow: boolean
}

export default function Row({ title, fetchUrl, isLargeRow = false }: RowProps) {
    /**
     * 영화 API 데이터 fetch 시 movies 상태 변경
     */
    const [movies, setMovies] = useState<Movie[]>([])

    /**
     * 영화 모달 클릭 시 selectedMovie 상태 변경
     */
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

    const handleClick = (movie: Movie) => {
        setSelectedMovie(movie)
    }

    const closeModal = () => setSelectedMovie(null)

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
        }

        fetchData()
    }, [fetchUrl])

    return (
        <div className="mt-8">
            <h2 className="text-white text-xl font-bold mb-2">{title}</h2>

            {/* ① 가로 스크롤 Row */}
            <div className="flex space-x-2 overflow-x-scroll scrollbar-hide p-2">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`rounded-md transition transform hover:scale-105 cursor-pointer ${isLargeRow ? "h-64" : "h-36"}`}
                        src={`https://image.tmdb.org/t/p/w500${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.title || movie.name}
                    />
                ))}
            </div>

            {/* ② 모달 */}
            {selectedMovie && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
                    onClick={closeModal}> // 배경 클릭 시 닫기
                    <div
                        className="bg-gray-900 text-white rounded-lg p-6 max-w-lg w-full relative"
                        onClick={e => e.stopPropagation()}> // 안쪽 클릭은 모달 닫기 방지
                        <button
                            className="absolute top-2 right-2 text-white text-xl font-bold"
                            onClick={closeModal}>
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{selectedMovie.title || selectedMovie.name}</h2>
                        <img
                            className="w-full rounded-md mb-4"
                            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                            alt={selectedMovie.title || selectedMovie.name}
                        />
                        <p>{selectedMovie.overview}</p>
                        <p className="mt-2">⭐ {selectedMovie.vote_average}</p>
                    </div>
                </div>
            )}

        </div>
    )
}

