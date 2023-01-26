import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled/macro'
import mq from 'mediaQuery'

import { H2 as DefaultH2, Title } from '../components/Typography/Basic'
import Anchor from '../components/Icons/Anchor'
import slugify from 'slugify'
import ReverseRecordImageSrc from '../assets/reverseRecordImage.png'
import {
  NonMainPageBannerContainer,
  DAOBannerContent
} from '../components/Banner/DAOBanner'

const H2 = styled(DefaultH2)`
  margin-top: 50px;
  margin-left: 20px;
  ${mq.medium`
    margin-left: 0;
  `}
`

const Question = styled('h3')`
  font-size: 15px;
  margin-right: 0.5em;
  display: inline;
`

const Answer = styled('p')``

const AnchorContainer = styled('a')``

const ImageContainer = styled('div')`
  margin: 2em;
`

const ReverseRecordImage = styled('img')`
  width: 100%;
  ${mq.medium`
    width: 600px;
  `}
`

const Section = ({ question, children }) => {
  let slug
  if (question) {
    slug = slugify(question, {
      lower: true
    })
  }
  return (
    <>
      <Question id={slug}>{question}</Question>
      <AnchorContainer href={`#${slug}`}>
        <Anchor />
      </AnchorContainer>

      <Answer>{children}</Answer>
    </>
  )
}

function Faq() {
  const { t } = useTranslation()
  useEffect(() => {
    document.title = 'RNS Faq'
  }, [])

  return (
    <>
      <FaqContainer>
        <Title>FAQ</Title>
        <H2>Before You register</H2>

        <Section question="Can I change the address my name points to after I’ve bought it?">
          Yes, you can update the addresses and other resources pointed to by
          your name at any time.
        </Section>

        <Section question="Can I register a TLD of my own in RNS?">
          No. We consider RNS to be part of the 'global namespace' inhabited by
          DNS, and so we do our best not to pollute that namespace. RNS-specific
          TLDs are restricted to only .redlc (on mainnet and testnet), plus any
          special purpose TLDs such as those required to permit reverse lookups.
        </Section>

        <Section question="What about foreign characters? What about upper case letters? Is any unicode charactervalid?">
          Since the RNS contracts only deal with hashes, they have no direct way
          to enforce limits on what can be registered; character length
          restrictions are implemented by allowing users to challenge a short
          name by providing its preimage to prove it's too short.
        </Section>

        <Section question="What happens if I forget to extend the registration of a name?">
          After your name expires, there is a 90 day grace period in which the
          owner can't edit the records but can still re-register the name. After
          the grace period, the name is released for registration by anyone with
          a temporary premium which decreases over a 28 days period. The
          released name continues to resolve your Redlight address until the new
          owner overwrites it
        </Section>

        <Section question="How many transactions are required to register a .redlc name?">
          The registrar uses two transactions (commit and reveal) to register a
          name
        </Section>

        <Section question="How long does it take to register a name using the .redlc registrar?">
          It takes less than 5 minutes to register a name, including a 1-minute
          delay between the first and second transactions to prevent
          frontrunning.
        </Section>

        <Section question="How do renewals work?">
          Anyone can add registration years to any existing name by paying the
          required fee, at any time. There is no maximum limitation of the
          renewal duration but there is a minimum renewal period of 28 days.
        </Section>

        <Section question='What is the "registrant" and "controller" of a name?'>
          The registrant is the account that owns the .redlc name. They can
          transfer ownership to another account, and they can replace the
          controller address. The registrant is the owner of the NFT token that
          represents the name. The controller is the account that controls
          day-to-day operations with the name: creating subdomains, setting the
          resolver and records, and so forth.
        </Section>
      </FaqContainer>
    </>
  )
}

const FaqContainer = styled('div')`
  margin: 1em;
  padding: 20px 40px;
  background-color: white;
`

export default Faq
