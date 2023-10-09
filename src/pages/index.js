import { useState, useEffect } from "react";

import Layout from "@components/Layout";
import Section from "@components/Section";
import Container from "@components/Container";
import Map from "@components/Map";

import styles from "@styles/Home.module.scss";
import FilterList from "@components/FilterList";
import { getTasksList } from "../../libs/sheets";
import {useSearchParams} from 'next/navigation';

const DEFAULT_CENTER = [31.385767551489135, 34.84534227151648];

export default function Home({ tasks }) {
    const [data, setData] = useState(tasks);
    const [marks, setMarks] = useState(tasks);
    const [filterTags, setFilterTags] = useState([]);
    const searchParams = useSearchParams();

    useEffect(() => {
        const filterOptions = [...new Set(data.flatMap((data) => [...data.tags]))];
        setFilterTags(filterOptions);
    }, [data]);

    useEffect(() => {
        const tags = new URLSearchParams(searchParams?.toString()).get("tags")?.split(",");
        console.log(tags)
        const filteredMarks = data.filter((data) => {
            return tags?.some((tag) => data.tags.includes(tag));
        });

        setMarks(filteredMarks);
    }, [searchParams]);

    return (
        <Layout>
            {/* <Head>
                <title>Next.js Leaflet Starter</title>
                <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
                <link rel="icon" href="/favicon.ico" />
            </Head> */}

            <Section>
                <Container>
                    {/* <h1 className={styles.title}>Next.js Leaflet Starter</h1> */}

                    <div className={styles.mapCt}>
                        <Map className={styles.homeMap} width="800" height="800" center={DEFAULT_CENTER} zoom={8}>
                            {({ TileLayer, Marker, Popup }) => (
                                <>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    {marks?.map((data, index) => (
                                        <Marker key={index} position={[data.location.lat, data.location.lng]}>
                                            <Popup>{data.title}</Popup>
                                        </Marker>
                                    ))}
                                    {/* <Marker position={DEFAULT_CENTER}>
                                        <Popup>
                                            A pretty CSS3 popup. <br /> Easily customizable.
                                        </Popup>
                                    </Marker> */}
                                </>
                            )}
                        </Map>

                        <FilterList className={styles.filterList} filterOptions={filterTags} />
                    </div>
                </Container>
            </Section>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    console.log("gdfgdfg")
    const tasksList = await getTasksList();
    const tasks = tasksList.slice(1, tasksList.length);
    tasks.forEach((task) => {
        const arr = task.location.split(",");
        task.location = { lat: arr[0], lng: arr[1] };

        const tags = task.tags.split(",");
        task.tags = tags;
    });
    return {
        props: {
            tasks,
        },
    };
}
