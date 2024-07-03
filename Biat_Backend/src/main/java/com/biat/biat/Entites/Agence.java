package com.biat.biat.Entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name="Agence")
public class Agence implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "code_postal")
    private String codePostal;

    @Column(name = "ville")
    private String ville;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "fax")
    private String fax;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "agence", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Compte> comptes;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "agence")
    @JsonIgnore
    private List<Agent> agentList;

    @JsonIgnore
    @OneToMany(mappedBy = "agence")
    private List<ChequeBookRequest> chequeBookRequests;

}
