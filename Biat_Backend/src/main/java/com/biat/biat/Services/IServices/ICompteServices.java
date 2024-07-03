package com.biat.biat.Services.IServices;

import com.biat.biat.Entites.Agence;
import com.biat.biat.Entites.Compte;
import com.biat.biat.Entites.TypeCompte;

import java.util.List;

public interface ICompteServices {
    List<Compte> getAllAcoutByAgence(Long idAgence);
    Compte ajouterCompte(Compte compte);
    List<Compte> getAllAcout();
    TypeCompte getTypeCompteByClientId(Long clientId);
    int getNbAcoutByTypeCompte(TypeCompte typeCompte);
    Compte addAcount(Long idAgent,Long IdClient ,Compte compte,Long idAgence);
    Compte  updateAccount(Compte compte);
    void deleteAccount(Long id);
    Compte getCompteById(Long id);
    Double getSoldeByClientId(Long clientId);
}
