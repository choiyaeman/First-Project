package com.bitacademy.vo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "data")
public class DataVO {

    @Id
    @Field("id")
    private String id;

    @Field("Temperature")
    private String temperature;

    @Field("Wtime") // 전력사용량?
    private String wtime;

    @Field("Humidity")
    private String humidity;

    @Field("waterFlow")
    private String waterFlow;

    @Field("W") // 소비전력
    private String w;

    @Field("time")
    private String time;

    @Field("DustDensity")
    private String dustDensity;

    public DataVO(String id, String temperature, String wtime, String humidity, String waterFlow, String w, String time,
            String dustDensity) {
        this.id = id;
        this.temperature = temperature;
        this.wtime = wtime;
        this.humidity = humidity;
        this.waterFlow = waterFlow;
        this.w = w;
        this.time = time;
        this.dustDensity = dustDensity;
    }

    public DataVO() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }

    public String getWtime() {
        return wtime;
    }

    public void setWtime(String wtime) {
        this.wtime = wtime;
    }

    public String getHumidity() {
        return humidity;
    }

    public void setHumidity(String humidity) {
        this.humidity = humidity;
    }

    public String getwaterFlow() {
        return waterFlow;
    }

    public void setwaterFlow(String waterFlow) {
        this.waterFlow = waterFlow;
    }

    public String getW() {
        return w;
    }

    public void setW(String w) {
        this.w = w;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDustDensity() {
        return dustDensity;
    }

    public void setDustDensity(String dustDensity) {
        this.dustDensity = dustDensity;
    }

}