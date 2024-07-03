package com.biat.biat.Entites;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity

@Table(name="Client")
public class Client extends User {

    @Column(name="cin")
    private long cin;

    @Temporal(TemporalType.DATE)
    private Date dateNaissance;

    @Column(name="adresse")
    private String adresse;

    @Column(name="nationality")
    private String nationality;
    private String image;

    @OneToOne(mappedBy = "client", cascade = CascadeType.ALL)
    @JsonIgnore
    private Compte compte;

    @JsonIgnore
    @OneToMany(mappedBy = "client")
    private List<ChequeBookRequest> chequeBookRequests;

}
