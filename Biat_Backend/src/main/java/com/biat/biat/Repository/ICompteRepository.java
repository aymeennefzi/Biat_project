package com.biat.biat.Repository;

import com.biat.biat.Entites.Compte;
import com.biat.biat.Entites.TypeCompte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ICompteRepository extends JpaRepository<Compte,Long> {
    List<Compte> findByAgence_Id(Long idAgence);
    Compte findByClient_Id(Long clientId);
    List<Compte>findByTypeCompte(TypeCompte typeCompte);
    @Query("SELECT c.solde FROM Compte c WHERE c.client.id = :clientId")
    Double findSoldeByClientId(Long clientId);

}
