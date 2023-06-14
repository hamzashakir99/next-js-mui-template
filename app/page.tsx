"use client";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
import { Box, Grid } from "@mui/material";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function getMovies() {
  let res = await fetch(`https://cataas.com/api/cats`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return res.json();
}

async function Trending() {
  try {
    const results = await getMovies();
    if(!results.length) {
      throw new Error("No record found");
    } else {
      return (
        <div>
          <h3>Movies</h3>
          {results &&
            results.map((data: any) => {
              return <li key={data._id}>{data._id}</li>;
            })}
        </div>
      );
    }
  }
  catch (error: any) {
    throw new Error(error);
  }
}

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Trending/>
      </Suspense>
      <Box sx={{
        mt: 5,
        width: {
          "sm": "100%"
        }
      }}>

      </Box>
      <Grid container spacing={2}>
        <Grid item xs ={12} md={6} >

        </Grid>
        <Grid item xs ={12} md={6} >

        </Grid>
      </Grid>
    </>
  );
}
