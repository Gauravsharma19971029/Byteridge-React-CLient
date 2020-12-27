import React from "react";
import "./pagination.css";

export default function Pagination({ auditsPerPage, totalAudits, paginate }) {
  const pageNumbers = [];
  for (
    let index = 1;
    index <= Math.ceil(totalAudits / auditsPerPage);
    index++
  ) {
    pageNumbers.push(index);
  }
  return (
    <nav className="page-numbers">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
