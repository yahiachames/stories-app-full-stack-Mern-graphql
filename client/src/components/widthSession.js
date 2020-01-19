import React, { Component } from "react";
import { GET_CURRENT_USER } from "../queries/index";
import { Query } from "react-apollo";

const withSession = Component => props => {
  return (
    <Query query={GET_CURRENT_USER}>
      {({ data, loading, refetch }) => {
        if (loading) return <div> loading... </div>;

        return <Component {...props} refetch={refetch} session={data} />;
      }}
    </Query>
  );
};

export default withSession;
