import React from "react";
import { Container } from "react-bootstrap";
import FooterApp from "../../components/FooterApp";
import NavbarApp from "../../components/NavbarApp";

function CategoryArticle() {
  return (
    <div>
      <NavbarApp />
      <div className="py-5">
        <Container>Category here</Container>
      </div>
      <FooterApp />
    </div>
  );
}

export default CategoryArticle;
