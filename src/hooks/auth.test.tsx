import AuthProvider, {useAuth} from './auth'
import {renderHook, act} from '@testing-library/react-hooks'/* importa isso pq nao tem elemento a ser exibido na tela, vc ta testando um hook */
import fetchMock from 'jest-fetch-mock'
import { startAsync } from 'expo-auth-session';

fetchMock.enableMocks();

jest.mock('expo-auth-session')

/* 1 - Abre uma tela para o usuário autenticar, mas isso é um fator externo, que é p usuário se autenticar e os testes nao podem depender de fatores externos
2 - Retorna type e params
3 - Fetch de dados de perfil no servidor da Google
Para fazer isso td temos q simnular, e para fazer isso vamos fazer o mock */

describe('Auth Hook', () => {

    it('Should be able to sign in with google acount existing', async () => {
        
        const userTest = {
            id: 'any_id',
            email: 'john.doe@email.com',
            name: 'John Doe',
            photo: 'any_photo.png',
        };

        const googleMocked = jest.mocked(startAsync as any)

        googleMocked.mockReturnValue({
            type: 'success',
            params: {
                access_token: 'any_token'
            }
        })

        fetchMock.mockResponseOnce(JSON.stringify(userTest))

        const {result} = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        })
        /* console.log(result.current); */

        await act(() => result.current.signInWithGoogle())/* tenho que fazer isso pq essa função do sigin atualiza um ESTADO entao tenho q fazer isso e ele tem q ser assincrono*/

        expect(result.current.user).toBeTruthy
    })
    

})