import React from "react";
import Layout from "../Partials/Layout";
import TableBlog from "./TableBlog";

export default function History() {
  return (
    <>
      <Layout>
        <div className="history-wrapper w-full mb-10">
          <div className="main-wrapper w-full">
            <TableBlog />
          </div>
        </div>
      </Layout>
    </>
  );
}
