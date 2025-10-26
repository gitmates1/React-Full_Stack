import React from "react";
import blog1 from "../assets/images/blog/b11.jpg";
import blog2 from "../assets/images/blog/b21.jpg";
import blog3 from "../assets/images/blog/b3.jpg";
import blog4 from "../assets/images/blog/b4.jpg";
import blog5 from "../assets/images/blog/b2.jpg";

const Blog = () => {
  return (
    <>
      <section id="blog">
        <div className="blog-box">
          <div className="blog-img">
            <img src={blog1} alt="Blog 1" />;
          </div>
          <div className="blog-de">
            <h4>The Cotton-Jersey Zip Up Hoodie</h4>
            <p>
              Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr wolf chartreuse hexagon irony. godard...
            </p>
            <a href="#">CONTINUE READING</a>
          </div>
        </div>

        <div className="blog-box">
          <div className="blog-img">
            <img src={blog2} alt="Blog 2" />;
          </div>
          <div className="blog-de">
            <h4>How to Style a Quiff</h4>
            <p>
              Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr wolf chartreuse hexagon irony. godard...
            </p>
            <a href="#">CONTINUE READING</a>
          </div>
        </div>

        <div className="blog-box">
          <div className="blog-img">
            <img src={blog3} alt="Blog 3" />;
          </div>
          <div className="blog-de">
            <h4>Must-Have Skater Girl Items</h4>
            <p>
              Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr wolf chartreuse hexagon irony. godard...
            </p>
            <a href="#">CONTINUE READING</a>
          </div>
        </div>

        <div className="blog-box">
          <div className="blog-img">
            <img src={blog4} alt="Blog 4" />;
          </div>
          <div className="blog-de">
            <h4>Runaway-Inspired Trends</h4>
            <p>
              Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr wolf chartreuse hexagon irony. godard...
            </p>
            <a href="#">CONTINUE READING</a>
          </div>
        </div>

        <div className="blog-box">
          <div className="blog-img">
            <img src={blog5} alt="Blog 5" />;
          </div>
          <div className="blog-de">
            <h4>AW20 Women-Sware Trends</h4>
            <p>
              Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr wolf chartreuse hexagon irony. godard...
            </p>
            <a href="#">CONTINUE READING</a>
          </div>
        </div>
      </section>

      
    </>
  );
};

export default Blog;
