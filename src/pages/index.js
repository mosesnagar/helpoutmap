import { useState, useEffect } from "react";
import Head from "next/head";

import Layout from "@components/Layout";
import Section from "@components/Section";
import Container from "@components/Container";
import Map from "@components/Map";

import styles from "@styles/Home.module.scss";
import { mockData } from "src/mock";
import FilterList from "@components/FilterList";
import { getTasksList } from "../../libs/sheets";

const DEFAULT_CENTER = [32.109333, 34.855499];

export default function Home({tasks}) {
    const [data, setData] = useState(tasks);
    const [filterTags, setFilterTags] = useState([]);

    useEffect(() => {
        const filterOptions = [...new Set(data.flatMap((data) => [...data.tags]))];
        setFilterTags(filterOptions);
    }, []);

    return (
        <Layout>
            <Head>
                <title>Next.js Leaflet Starter</title>
                <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Section>
                <Container>
                    <h1 className={styles.title}>Next.js Leaflet Starter</h1>

                    <div className={styles.mapCt}>
                        <Map className={styles.homeMap} width="800" height="800" center={DEFAULT_CENTER} zoom={12}>
                            {({ TileLayer, Marker, Popup }) => (
                                <>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    {data?.map((data, index) => (
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

                        <FilterList filterOptions={filterTags} />
                    </div>
                </Container>
            </Section>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const tasksList = await getTasksList();
    const tasks = tasksList.slice(1, tasksList.length);
    tasks.forEach(task => {
        const arr= task.location.split(',');
        task.location = {lat: arr[0], lng: arr[1]};

        const tags = task.tags.split(',');
        task.tags = tags;
    });
    return {
      props: {
        tasks
      },
    };
  }