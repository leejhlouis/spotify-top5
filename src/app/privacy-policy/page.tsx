import Heading1 from '@/components/Heading1'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className='mx-auto max-w-screen-md'>
      <Heading1>Privacy Policy</Heading1>
      <p>
        <b>Spotify Top 5</b> (the &quot;App&quot;) was built with an integration using Spotify Web API to provide your personalized monthly top 5 artists and tracks. By logging in with your Spotify
        account, you consent to us retrieving your personal Spotify data through the integration.
      </p>
      <br />
      <p>
        The App <b>does not</b> store any of your data and does not share it with third parties. Your information is used solely for displaying your monthly top 5 artists and tracks.
      </p>
      <br />
      <p>
        If you wish to revoke the App&apos;s access to your Spotify data, navigate to your Spotify profile settings. Under <b>&quot;Security and Privacy&quot;</b>, select{' '}
        <b>&quot;Manage apps&quot;</b>, then, click
        <b>&quot;Remove Access&quot;</b> next to Spotify Top 5. For additional guidance, refer to the{' '}
        <Link href='https://support.spotify.com/us/article/spotify-on-other-apps/'>official support page</Link>.
      </p>
      <br />
    </div>
  )
}
