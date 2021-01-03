import React from "react";

export default ({ value, onChange }) => {
  return (
    <div style={{ marginTop: "-20px", marginBottom: "20px" }}>
      <div className="control has-icons-left">
        <input
          className="input"
          type="text"
          placeholder="Search"
          value={value}
          onChange={onChange}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-search" />
        </span>
      </div>
    </div>
  );
};
