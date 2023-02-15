<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit65a11e6d8dba29882af4b2c98a14db4b
{
    public static $prefixLengthsPsr4 = array (
        'p' => 
        array (
            'phpGPX\\' => 7,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'phpGPX\\' => 
        array (
            0 => __DIR__ . '/..' . '/sibyx/phpgpx/src/phpGPX',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit65a11e6d8dba29882af4b2c98a14db4b::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit65a11e6d8dba29882af4b2c98a14db4b::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit65a11e6d8dba29882af4b2c98a14db4b::$classMap;

        }, null, ClassLoader::class);
    }
}
