import AuthProvider, {useAuth} from './auth'
import {renderHook, act} from '@testing-library/react-hooks'/* importa isso pq nao tem elemento a ser exibido na tela, vc ta testando um hook */
import fetchMock from 'jest-fetch-mock'
import { startAsync } from 'expo-auth-session';

const mockStartAsync = jest.fn();
jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => mockStartAsync()
  }
})

jest.mock('expo-apple-authentication', () => ({}))

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: async () => {}
}))

/* 1 - Abre uma tela para o usuário autenticar, mas isso é um fator externo, que é p usuário se autenticar e os testes nao podem depender de fatores externos
2 - Retorna type e params
3 - Fetch de dados de perfil no servidor da Google
Para fazer isso td temos q simnular, e para fazer isso vamos fazer o mock */

describe('Auth Hook', () => {

    it('Should be able to sign in with google acount existing', async () => {
        
        mockStartAsync.mockReturnValue({
            type: 'success',
            params: {
              access_token: 'my-access-token'
            },
            user: {
              id: 'any_id',
              email: 'leo_araujo05@hotmial.com',
              name: 'Leonardo',
              photo: 'picture'
            }
          })
      
      
          global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
              id: `userInfo.id`,
              email: `userInfo.email`,
              name: `useInfo.given_name`,
              photo: `userInfo.picture`,
              locale: `userInfo.locale`,
              verified_email: `userInfo.verified_email`
            })
          })) as jest.Mock;

        const {result} = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        })
        /* console.log(result.current); */

        await act(() => result.current.signInWithGoogle())/* tenho que fazer isso pq essa função do sigin atualiza um ESTADO entao tenho q fazer isso e ele tem q ser assincrono*/

        expect(result.current.user).toBeTruthy()
        //expect(result.current.user).not.toHaveProperty('id') esse dai deu erro pq ja recebeu o id do usuario
    })
    
    it('user should not connect if cancel authemtication with Google', async () => {
        mockStartAsync.mockReturnValue({
            type: 'error',
          })

        const {result} = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        })
        /* console.log(result.current); */

        await act(() => result.current.signInWithGoogle())/* tenho que fazer isso pq essa função do sigin atualiza um ESTADO entao tenho q fazer isso e ele tem q ser assincrono*/

        expect(result.current.user).not.toHaveProperty('id')//passou também
    })

})