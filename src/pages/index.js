import React from "react";
import { Container } from "react-bootstrap";
import NavbarApp from "../components/NavbarApp";

const Home = () => {
  return (
    <div>
      <NavbarApp />
      <section className="bg-dark pt-3 pb-5">
        <Container>
          <h2 className="text-white fw-bold">Trending</h2>
        </Container>
      </section>
    </div>
  );
};

export default Home;
