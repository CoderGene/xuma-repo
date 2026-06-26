import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { supabase } from './lib/supabase'

import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import FarmerHomeScreen from './screens/FarmerHomeScreen'
import ConsumerHomeScreen from './screens/ConsumerHomeScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  const [session, setSession] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) fetchRole(session.user.id)
      else setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        if (session) fetchRole(session.user.id)
        else {
          setRole(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchRole = async (userId) => {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()
    setRole(data?.role ?? null)
    setLoading(false)
  }

  if (loading) return null

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!session ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : role === 'farmer' ? (
          <Stack.Screen name="FarmerHome" component={FarmerHomeScreen} />
        ) : (
          <Stack.Screen name="ConsumerHome" component={ConsumerHomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}