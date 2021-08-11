package io.gpn.adoptation;

import android.app.NotificationManager;
import android.content.Context;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    
    @Override
    public void onStart() {
        super.onStart();
        resetBadgeCounter();
    }

    private void resetBadgeCounter() {
        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (notificationManager != null) {
            notificationManager.cancelAll();
        }
    }
}
