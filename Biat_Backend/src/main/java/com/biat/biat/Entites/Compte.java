package com.biat.biat.Entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name="Compte")
public class Compte implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numeroCompte")
    private String numeroCompte;

    @Enumerated(EnumType.STRING)
    @Column(name = "typeCompte")
    private TypeCompte typeCompte;

    @Column(name = "solde")
    private double solde;

    @Temporal(TemporalType.DATE)
    @Column(name = "dateCreation")
    private Date dateCreation;

    @OneToOne
    @JoinColumn(name = "client_id")

    private Client client;

    @ManyToOne
    @JoinColumn(name = "agence_id")
    private Agence agence;
    @ManyToOne
    @JoinColumn(name = "agent_id")
    private Agent agent;



}
