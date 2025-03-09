package com.example.movies_app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MovieDto {

    @JsonProperty("Title")
    private String Title;

    @JsonProperty("Year")
    private String Year;

    @JsonProperty("Type")
    private String Type;

    @JsonProperty("Poster")
    private String Poster;

    public MovieDto() {}

    public MovieDto(String title, String year, String type, String poster) {
        this.Title = title;
        this.Year = year;
        this.Type = type;
        this.Poster = poster;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        this.Title = title;
    }

    public String getYear() {
        return Year;
    }

    public void setYear(String year) {
        this.Year = year;
    }

    public String getType() {
        return Type;
    }

    public void setType(String type) {
        this.Type = type;
    }

    public void setPoster(String poster) {
        Poster = poster;
    }

    public String getPoster() {
        return Poster;
    }
    @Override
    public String toString() {
        return "MovieDto{" +
                "title='" + Title + '\'' +
                ", year='" + Year + '\'' +
                ", type='" + Type + '\'' +
                '}';
    }
}
