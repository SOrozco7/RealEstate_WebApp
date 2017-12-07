package com.example.adsoft.SyncTaskClass;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.Toast;

import com.google.api.client.extensions.android.http.AndroidHttp;
import com.google.api.client.json.gson.GsonFactory;
import com.usuarios_api.UsuariosApi;
import com.usuarios_api.model.MessagesEmailPasswordMessage;
import com.usuarios_api.model.MessagesTokenMessage;

/**
 * Created by adsoft on 7/11/17.
 */

public class loginSyncTask extends AsyncTask<String,Void,MessagesTokenMessage> {

    Context context;
    private ProgressDialog pd;
    MessagesTokenMessage respuesta;

    public loginSyncTask(Context context) {this.context = context; }

    @Override
    protected void onPreExecute()
    {
        super.onPreExecute();
        pd = new ProgressDialog(context);
        pd.setMessage("Login");
        pd.show();
    }




    @Override
    protected MessagesTokenMessage doInBackground(String... params) {

        respuesta = new MessagesTokenMessage();
        try
        {
            UsuariosApi.Builder builder =
                    new UsuariosApi.Builder(AndroidHttp.newCompatibleTransport(), new GsonFactory(), null);
            UsuariosApi service = builder.build();
            MessagesEmailPasswordMessage log = new MessagesEmailPasswordMessage();
            //params es una lista de strings que funciona como argv
            //[0] = email, [1] = password
            log.setEmail(params[0]);
            log.setPassword(params[1]);
            respuesta = service.users().login(log).execute();
        }
        catch (Exception e)
        {
            Log.d("No se pudo iniciar", e.getMessage(), e);
        }
        finally
        {
            return respuesta;
        }
    }


    @Override
    protected void onPostExecute(MessagesTokenMessage messagesTokenMessage)
    {
        pd.dismiss();
        if(respuesta.getToken()!= null)
            Toast.makeText(this.context, "Login succesfully " + respuesta.getToken(), Toast.LENGTH_SHORT).show();
        else
            Toast.makeText(this.context,"Invalid Login",Toast.LENGTH_SHORT).show();
    }
}
