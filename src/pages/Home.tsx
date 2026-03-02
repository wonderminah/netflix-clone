import { useState } from "react";
import type { Movie } from "../types/movie";
import Row from "../components/Row"
import requests from "../lib/requests"

function Home() {
    return (
        <div>
            <Row title="Trending" fetchUrl={requests.fetchTrending} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        </div>
    )
}

export default Home