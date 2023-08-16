import React, { useState, useEffect } from 'react'
import { GetStaticProps, NextPage } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Layout } from '../../components/layouts'
import { CardComponent as Card } from '../../components/ui/profile-card';

import styles from './members.module.css';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';

const dataFetcher = (url: string) => axios.get(url).then(res => res.data).catch(error=> {throw error});

interface countryMember{
    country_name: string;
    esp_name: string;
    id_country: string;
    iso2: string;
    iso3: string;
    other_name: string;
}

interface member{
    imgUrl: string;
    title: any;
    country: any;
    link: string,
    fb: string,
    tw: string,
    ig: string,
    ln: string,
}

interface MemberCard {
    country: countryMember;
    facebook: string;
    id_patnert: string;
    instagram: string;
    label: string;
    logo_url: string;
    short_name: string;
    twitter: string;
    webpage: string
}

const OurMembers: NextPage = () => {
    const { locale } = useRouter();
    const { t: dataTranslate } = useTranslation('our-member');

    const { data: membersData, isLoading: isLoadingMembers, error: errorMembers } = useSWR<MemberCard[]>(`https://riceobservatory.org//api/v1/patnerts`, dataFetcher, {errorRetryCount:2,revalidateOnFocus:false}); //EP
    
    const [members,setMembers]= useState(Array<member[]>(0))
    useEffect(()=>{
        const auxrow = Array(0)
        const auxarr = Array(0)
        membersData?.map((member,idx)=> {
            auxrow.push({
                imgUrl:member.logo_url,
                title: {
                    en: member.label,
                    es: member.label,
                    pt: member.label
                },
                country: {
                    en: member.country.esp_name,
                    es: member.country.esp_name,
                    pt: member.country.esp_name
                },
                link: member.webpage,
                fb: member.facebook? "https://www.facebook.com/".concat(member.facebook) : null,
                tw: member.twitter? "https://www.twitter.com/".concat(member.twitter) : null,
                ig: member.instagram? "https://www.instagram.com/".concat(member.instagram) : null,
                ln: null           
            })
            if((idx+1)%3==0) {
                auxarr.push(auxrow.splice(0,auxrow.length))
            }
            return true
        })
        auxarr.push(auxrow.splice(0,auxrow.length))
        setMembers(auxarr)
    },[membersData])

    return (
        <Layout title={dataTranslate('section-name')}>
            <div className={ styles['main-container'] }>
                <div className={ styles['main-title'] }>
                    <h2>{dataTranslate('main-title')}</h2>
                </div>
                <div className={ styles['main-text'] }>
                    {dataTranslate('main-text1')}
                    <b>{dataTranslate('main-text2')}</b>
                    {dataTranslate('main-text3')}
                </div>
                {members.map((row,idx)=> <div className={ styles['main-cards-container'] }> {row.map(card=><Card imgUrl={card.imgUrl} title={card.title[locale as keyof typeof card.title]} country={card.country[locale as keyof typeof card.title]}  link={card.link} fb={card.fb} tw={card.tw} ig={card.ig} ln={card.ln}/>)} </div>)}                 
            </div>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...( await serverSideTranslations( locale!, ['our-member'] ) )
        }
    }
}

export default OurMembers